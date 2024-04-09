using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.Entities
{
    [Table("Role")]
    public class Role
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<EmployeeRole> EmployeesRole { get; set; }
    }
}
