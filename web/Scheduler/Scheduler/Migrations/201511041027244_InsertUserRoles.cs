namespace Scheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InsertUserRoles : DbMigration
    {
        public override void Up()
        {
            Sql("DELETE FROM dbo.AspNetRoles");
            Sql("INSERT INTO dbo.AspNetRoles (Id,Name) VALUES (1, N'�������������')");
            Sql("INSERT INTO dbo.AspNetRoles (Id,Name) VALUES (2, N'������������')");
        }
        
        public override void Down()
        {
            Sql("DELETE FROM dbo.AspNetRoles");
        }
    }
}
