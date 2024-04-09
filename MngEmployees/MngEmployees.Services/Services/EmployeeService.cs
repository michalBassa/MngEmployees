using MngEmployees.Core.DTO;
using MngEmployees.Core.Entities;
using MngEmployees.Core.IRepositories;
using MngEmployees.Core.IServices;
using MngEmployees.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Services.Services
{
    public class EmployeeService: IEmployeeService
    {
        readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }
        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
        }
        public async Task<bool> AddAsync(Employee employee)
        {
            var allEmployess = await _employeeRepository.GetAllAsync();
            List<Employee> list = allEmployess.ToList();
            var employeeExists = list.Find(e => e.TZ == employee.TZ);
            if (employeeExists != null)
                return false;
            return  await _employeeRepository.AddAsync(employee);
 
        }
        public async Task DeleteAsync(int id)
        {
            await _employeeRepository.DeleteAsync(id);
        }
        public async Task<Employee> UpdateAsync(Employee employee)
        {
            return await _employeeRepository.UpdateAsync(employee);
        }
       
        
    }
}
