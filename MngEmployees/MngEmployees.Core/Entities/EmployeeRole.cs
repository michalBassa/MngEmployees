using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.Entities
{
    [Table("EmployeeRole")]
    public class EmployeeRole
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int? EmployeeId { get; set; }

        [ForeignKey(nameof(EmployeeId))]
        public Employee? Employee { get; set; }
        public int? RoleId { get; set; }

        [ForeignKey(nameof(RoleId))]
        public Role? Role { get; set; }
        public DateTime StartDateRole { get; set; }
      
        public bool IsManagerialRole { get; set; }
    }
}
