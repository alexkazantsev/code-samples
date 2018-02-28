package faculty

import (
	"cheetah/department"
	"github.com/jinzhu/gorm"
)

type Faculty struct {
	gorm.Model
	Name         string                 `json:"name"`
	Departments  department.Departments `json:"departments"` //Faculty has many departments
	UniversityID uint                   `json:"university_id"`
}

type Faculties []Faculty
