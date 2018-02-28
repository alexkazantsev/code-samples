package department

import (
	"cheetah/group"
	"github.com/jinzhu/gorm"
)

type Department struct {
	gorm.Model
	Name      string       `json:"name"`
	FacultyID uint         `json:"faculty_id"`
	Groups    group.Groups `json:"groups"` //Department has many groups
}

type Departments []Department
