#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import shutil
from pathlib import Path


class ObfuscationError(Exception):
    pass


def find_solution_file(root: Path) -> Path:
    sln_files = list(root.glob("*.sln"))
    if sln_files:
        return sln_files[0]
    for child in root.rglob("*.sln"):
        return child
    raise ObfuscationError(f"No .sln file found under {root}")


def strip_comments(source: str) -> str:
    out = []
    i = 0
    length = len(source)
    state = "normal"
    while i < length:
        ch = source[i]
        nxt = source[i + 1] if i + 1 < length else ""

        if state == "normal":
            if ch == "/" and nxt == "/":
                state = "line_comment"
                i += 2
                continue
            if ch == "/" and nxt == "*":
                state = "block_comment"
                i += 2
                continue
            if ch == "@" and nxt == '"':
                state = "verbatim_string"
                out.append(ch)
                out.append(nxt)
                i += 2
                continue
            if ch == "$" and nxt == '"':
                state = "interpolated_string"
                out.append(ch)
                out.append(nxt)
                i += 2
                continue
            if ch == "$" and nxt == "@" and i + 2 < length and source[i + 2] == '"':
                state = "interpolated_verbatim_string"
                out.append(ch)
                out.append(nxt)
                out.append('"')
                i += 3
                continue
            if ch == '"':
                state = "string"
                out.append(ch)
                i += 1
                continue
            if ch == "'":
                state = "char"
                out.append(ch)
                i += 1
                continue
            out.append(ch)
            i += 1
            continue

        if state == "line_comment":
            if ch == "\n":
                out.append(ch)
                state = "normal"
            i += 1
            continue

        if state == "block_comment":
            if ch == "*" and nxt == "/":
                state = "normal"
                i += 2
            else:
                i += 1
            continue

        if state == "string":
            out.append(ch)
            if ch == "\\" and nxt:
                out.append(nxt)
                i += 2
                continue
            if ch == '"':
                state = "normal"
            i += 1
            continue

        if state == "char":
            out.append(ch)
            if ch == "\\" and nxt:
                out.append(nxt)
                i += 2
                continue
            if ch == "'":
                state = "normal"
            i += 1
            continue

        if state == "verbatim_string":
            out.append(ch)
            if ch == '"' and nxt == '"':
                out.append(nxt)
                i += 2
                continue
            if ch == '"':
                state = "normal"
            i += 1
            continue

        if state == "interpolated_string":
            out.append(ch)
            if ch == "\\" and nxt:
                out.append(nxt)
                i += 2
                continue
            if ch == '"':
                state = "normal"
            i += 1
            continue

        if state == "interpolated_verbatim_string":
            out.append(ch)
            if ch == '"' and nxt == '"':
                out.append(nxt)
                i += 2
                continue
            if ch == '"':
                state = "normal"
            i += 1
            continue

    return "".join(out)


def obfuscate_csharp_source(source: str) -> str:
    without_comments = strip_comments(source)
    lines = without_comments.splitlines()
    new_lines = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith("#"):
            new_lines.append(stripped)
        else:
            new_lines.append(stripped)
    return "\n".join(new_lines) + ("\n" if new_lines else "")


def obfuscate_directory(input_dir: Path, output_dir: Path) -> None:
    solution = find_solution_file(input_dir)
    if output_dir.exists():
        raise ObfuscationError(f"Output directory already exists: {output_dir}")
    output_dir.mkdir(parents=True)

    for root, dirs, files in os.walk(input_dir):
        rel_root = Path(root).relative_to(input_dir)
        target_root = output_dir / rel_root
        target_root.mkdir(parents=True, exist_ok=True)

        for filename in files:
            src_path = Path(root) / filename
            dest_path = target_root / filename

            if src_path.suffix.lower() == ".cs":
                content = src_path.read_text(encoding="utf-8")
                obfuscated = obfuscate_csharp_source(content)
                dest_path.write_text(obfuscated, encoding="utf-8")
            else:
                shutil.copy2(src_path, dest_path)

    solution_rel = solution.relative_to(input_dir)
    print(f"Obfuscated solution written to: {output_dir}")
    print(f"Solution file: {output_dir / solution_rel}")


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Obfuscate C# source files by removing comments and extra whitespace, "
            "while preserving method signatures and execution correctness."
        )
    )
    parser.add_argument("input_dir", type=Path, help="Path to folder containing .sln")
    parser.add_argument("output_dir", type=Path, help="Path for obfuscated output")

    args = parser.parse_args()

    try:
        obfuscate_directory(args.input_dir, args.output_dir)
    except ObfuscationError as exc:
        raise SystemExit(str(exc)) from exc

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
