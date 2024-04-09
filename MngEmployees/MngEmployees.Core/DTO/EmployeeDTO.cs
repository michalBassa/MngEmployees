using MngEmployees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.DTO
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string TZ { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public bool ActivityStatus { get; set; }
        public DateTime StartWorkDate { get; set; }
        public IEnumerable<EmployeeRoleDTO> EmployeeRoles { get; set; }
    }
}
