using MngEmployees.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.DTO
{
    public class EmployeeRoleDTO
    {

        public int? RoleId { get; set; }
        public DateTime StartDateRole { get; set; }
        public bool IsManagerialRole { get; set; }
    }
}
