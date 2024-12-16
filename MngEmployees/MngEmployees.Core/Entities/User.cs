using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.Entities
{
    [Table("User")]
    public class User
    {
        [Key]
        public int Id { get; init; }
        public string UserName { get; init; }
        public string Password { get; set; }


    }
}
