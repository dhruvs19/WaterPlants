using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace svplants.Models {
    public class Plant {
        [Key]
        public int id { get; set; }
        [Column(TypeName="nvarchar(100)")]
        public string name { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string type { get; set; }
        public DateTime last_watered { get; set; }
    }

}
