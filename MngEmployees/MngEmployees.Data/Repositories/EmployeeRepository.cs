using Microsoft.EntityFrameworkCore;
using MngEmployees.Core.DTO;
using MngEmployees.Core.Entities;
using MngEmployees.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;

namespace MngEmployees.Data.Repositories
{
    public class EmployeeRepository: IEmployeeRepository
    {
        readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public EmployeeRepository(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper=mapper;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _dataContext.EmployeesDb.Include(e => e.EmployeeRoles).ToListAsync();
        }
        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _dataContext.EmployeesDb.Where(e => e.Id == id).Include(r => r.EmployeeRoles).FirstAsync();

        }
        public async Task<bool> AddAsync(Employee employee)
        {
            _dataContext.EmployeesDb.Add(employee);
            await _dataContext.SaveChangesAsync();
            return true;
        }
        public async Task DeleteAsync(int id)
        {
            var employee = await GetByIdAsync(id);
            employee.ActivityStatus=false;
            await _dataContext.SaveChangesAsync();
            
        }
        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var existEmployee = await GetByIdAsync(employee.Id);
            _dataContext.Entry(existEmployee).CurrentValues.SetValues(existEmployee);
            await _dataContext.SaveChangesAsync();
            return existEmployee;
        }
       
       
    } 
}
