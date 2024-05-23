package com.giroDelGusto.GiroDelGusto.mappers;

import com.giroDelGusto.GiroDelGusto.dtos.UserDto;
import com.giroDelGusto.GiroDelGusto.models.SignUp;
import com.giroDelGusto.GiroDelGusto.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "profile", target = "profile"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "username", target = "username"),
            @Mapping(source = "role", target = "role")
    })
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    @Mappings({
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "username", target = "username"),
    })
    User signUpToUser(SignUp signUp);

}