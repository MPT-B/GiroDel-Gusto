package com.giroDelGusto.GiroDelGusto.repositories;

import com.giroDelGusto.GiroDelGusto.models.UserCuisinePreference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCuisinePreferenceRepository extends JpaRepository<UserCuisinePreference, Integer> {
}