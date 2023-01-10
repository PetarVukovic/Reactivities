using Microsoft.EntityFrameworkCore;
using Domain;//for activity
using System.Data;
namespace Persistence
{
    public class DataContext : DbContext// sesija sa databazom query and use instancies of your entities
    {
        //konstruktor za baznu klasu 
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        //db sests -represent the tables that wear going to create

        public DbSet <Activity> Activities { get; set; }//table i n our db 
    }
}