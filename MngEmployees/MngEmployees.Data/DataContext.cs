using Microsoft.EntityFrameworkCore;
using MngEmployees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Employee> EmployeesDb { get; set; }
        public DbSet<EmployeeRole> EmployeesRolesDb { get; set; }
        public DbSet<Role> RolesDb { get; set; }


       
       
    }
}
