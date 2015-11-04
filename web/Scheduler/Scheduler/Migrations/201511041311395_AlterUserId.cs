namespace Scheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterUserId : DbMigration
    {
        public override void Up()
        {
            RenameColumn("dbo.UserSchedules","UserId_Id", "UserId");
        }
        
        public override void Down()
        {
        }
    }
}
