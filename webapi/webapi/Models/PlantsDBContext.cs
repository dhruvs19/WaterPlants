using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace svplants.Models {
    public class PlantsDBContext:DbContext {
        public PlantsDBContext(DbContextOptions<PlantsDBContext> options) : base(options) { 
        
        }

        public DbSet<Plant> Plants { get; set; }
    }
}
