namespace Scheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Second : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.UserSchedules", "UserId_Id", "dbo.AspNetUsers");
            DropIndex("dbo.UserSchedules", new[] { "UserId_Id" });
            DropTable("dbo.UserSchedules");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.UserSchedules",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CalendarId = c.Long(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        IsAllDay = c.Boolean(nullable: false),
                        Location = c.String(),
                        Notes = c.String(),
                        RecurRule = c.String(),
                        Reminder = c.String(),
                        Title = c.String(),
                        Url = c.String(),
                        UserId_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.UserSchedules", "UserId_Id");
            AddForeignKey("dbo.UserSchedules", "UserId_Id", "dbo.AspNetUsers", "Id");
        }
    }
}
