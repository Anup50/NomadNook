//package com.example.web_indi.service.impl;
//
//import com.example.web_indi.entity.Role;
//import com.example.web_indi.pojo.RolePojo;
//import com.example.web_indi.repository.RoleRepo;
//import com.example.web_indi.service.RoleService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.NoSuchElementException;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class RoleServiceImpl implements RoleService {
//
//    private final RoleRepo roleRepo;
//
//    @Override
//    public void saveRole(RolePojo rolePojo) {
//        Role role = new Role();
//
//        if (rolePojo.getId() != null) {
//            role = roleRepo.findById(rolePojo.getId())
//                    .orElseThrow(() -> new NoSuchElementException("No role found"));
//        }
//
//        role.setRole(rolePojo.getRole());
//
//        roleRepo.save(role);
//    }
//
//    @Override
//    public List<Role> getAllRoles() {
//        return roleRepo.findAll();
//    }
//
//    @Override
//    public Optional<Role> getRoleById(Long id) {
//        return roleRepo.findById(id);
//    }
//
//    @Override
//    public void deleteRoleById(Long id) {
//        roleRepo.deleteById(id);
//    }
//
//    @Override
//    public Role findByName(String roleName) {
//        return roleRepo.findByRole(roleName)
//                .orElseThrow(() -> new NoSuchElementException("Role not found"));
//    }
//
//}
