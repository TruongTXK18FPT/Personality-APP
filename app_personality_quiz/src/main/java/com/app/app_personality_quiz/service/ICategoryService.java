package com.app.app_personality_quiz.service;
import java.util.List;

import com.app.app_personality_quiz.dto.CategoryDTO;

public interface ICategoryService {
    List<CategoryDTO> getAllCategories();

    CategoryDTO getCategoryById(Long id);

    CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO);
}
