package teacher

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"strconv"
)

/**
 * Get users.
 */
func Fetch(conn *gorm.DB, id ...string) (*gorm.DB, error) {
	if len(id) > 0 {
		teacher_id, err := strconv.ParseUint(id[0], 10, 64)
		if err != nil {
			fmt.Println("ERROR USER ID PARSING", id[0])
			return nil, err
		} else {
			return conn.Where(gorm.Model{ID: uint(teacher_id)}).First(&Teacher{}), nil
		}
	}
	var teachers Teachers
	return conn.Find(&teachers), nil
}

func Register(conn *gorm.DB, classData *TeacherRequestJSON) (*TeacherResponseJSON, error) {
	newTeacher := Teacher{

		Firstname:    *classData.Firstname,
		Lastname:     *classData.Lastname,
	}

	err := conn.Create(&newTeacher).
	Find(&newTeacher).Error
	if err != nil {
		return nil, error(err)
	}

	classJSON := TeacherResponseJSON{
		Firstname:  newTeacher.Firstname,
		Lastname:   newTeacher.Lastname,
	}

	return &classJSON, nil

}

func Create(conn *gorm.DB, data *Teacher) *gorm.DB {
	return conn.Create(&data).Find(&data)
}