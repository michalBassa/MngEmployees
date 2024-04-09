using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.Entities
{
    public enum Gender
    {
        Male,
        Female
    }

    [Table("Employee")]
    public class Employee
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [RegularExpression("^[0-9]{9}$", ErrorMessage = "TZ must contain exactly 9 digits.")]
        public string TZ { get; set; }
        [RegularExpression(@"^[\p{L}\s]*$", ErrorMessage = "First name must contain only English or Hebrew letters.")]
        public string FirstName { get; set; }
       
        [RegularExpression(@"^[\p{L}\s]*$", ErrorMessage = "Last name must contain only English or Hebrew letters.")]
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public bool ActivityStatus { get; set; } = true;
        public DateTime StartWorkDate { get; set; }
        public IEnumerable<EmployeeRole> EmployeeRoles { get; set; }
    }
}
