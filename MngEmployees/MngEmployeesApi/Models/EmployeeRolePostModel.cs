using MngEmployees.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace MngEmployees.Api.Models
{
    public class EmployeeRolePostModel
    {
        public int RoleId { get; set; }

        public DateTime StartDateRole { get; set; }

        public bool IsManagerialRole { get; set; }
    }
}
