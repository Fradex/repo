namespace Scheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRoles : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        ImageUrl = c.String(),
                        Controller = c.String(),
                        ArmName = c.String(),
                    })
                .PrimaryKey(t => t.Id);

            Sql(" INSERT INTO dbo.Roles (Name,ImageUrl,Controller,ArmName)" +
                " VALUES (N'Администратор', 'icon-image-8','arm.Administrator','Администратор')");
            Sql(" INSERT INTO dbo.Roles (Name,ImageUrl,Controller,ArmName)" +
                " VALUES (N'Пользователь', 'icon-image-9','arm.User', 'Пользователь')");

            DropForeignKey("dbo.AspNetUsers", "Role_Id", "dbo.UserRoles");
            DropTable("dbo.UserRoles");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Role = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            DropTable("dbo.Roles");
        }
    }
}
