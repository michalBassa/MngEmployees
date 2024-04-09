using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MngEmployees.Core.DTO;
using MngEmployees.Core.IServices;
using MngEmployees.Services.Services;

namespace MngEmployees.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesRolesController : ControllerBase
    {
        readonly IEmployeeRoleService _employeeRoleService;
        readonly IMapper _mapper;

        public EmployeesRolesController(IEmployeeRoleService employeeRoleService, IMapper mapper)
        {
            _employeeRoleService = employeeRoleService;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employeesRoles = await _employeeRoleService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeRoleDTO>>(employeesRoles));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employeeRoles = await _employeeRoleService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeRoleDTO>(employeeRoles));
        }
    }
}
