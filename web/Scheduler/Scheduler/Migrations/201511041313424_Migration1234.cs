namespace Scheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migration1234 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.UserRoles", "UserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserRoles", "UserId", c => c.Int(nullable: false));
        }
    }
}
