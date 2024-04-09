using MngEmployees.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace MngEmployees.Api.Models
{
    public class EmployeePostModel
    {
        public string TZ { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public DateTime StartWorkDate { get; set; }
        public bool ActivityStatus { get; set; } = true;
        public IEnumerable<EmployeeRolePostModel> EmployeeRoles { get; set; }

    }
}
