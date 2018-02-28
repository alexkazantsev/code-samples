package migrations

import (
	"cheetah/account"
	"cheetah/department"
	"cheetah/faculty"
	"cheetah/group"
	"cheetah/login"
	"cheetah/university"
	"cheetah/user"
	"cheetah/lesson"
	"cheetah/teacher"
	"cheetah/class"
	"cheetah/schedule"
	"cheetah/schedule_day"
	"cheetah/day"
	"github.com/jinzhu/gorm"
)

func Migrate(conn *gorm.DB) {

	//conn.DropTable(
	//	&account.Account{},
	//	&login.Token{},
	//	&user.User{},
	//	&university.University{},
	//	&faculty.Faculty{},
	//	&department.Department{},
	//	&group.Group{},
	//	&lesson.Lesson{},
	//	&class.Class{},
	//	&teacher.Teacher{},
	//	&schedule.Schedule{},
	//	&schedule_day.ScheduleDay{},
	//	&day.Day{},
	//)
	//
	conn.AutoMigrate(
		&user.User{},
		&account.Account{},
		&university.University{},
		&faculty.Faculty{},
		&group.Group{},
		&department.Department{},
		&login.Token{},
		&lesson.Lesson{},
		&class.Class{},
		&teacher.Teacher{},
		&schedule.Schedule{},
		&schedule_day.ScheduleDay{},
		&day.Day{},
	)



	// Adding FK for each table
	//conn.Exec("ALTER TABLE user ADD FOREIGN KEY (university_id) REFERENCES university(id)")
	//conn.Exec("ALTER TABLE user ADD FOREIGN KEY (department_id) REFERENCES department(id)")
	//conn.Exec("ALTER TABLE user ADD FOREIGN KEY (faculty_id) REFERENCES faculty(id)")
	//
	//conn.Exec("ALTER TABLE token ADD FOREIGN KEY (user_id) REFERENCES user(id)")
	//
	//
	//conn.Exec("ALTER TABLE class ADD FOREIGN KEY (lesson_id) REFERENCES lesson(id)")
	//conn.Exec("ALTER TABLE class ADD FOREIGN KEY (teacher_id) REFERENCES teacher(id)")
	////conn.Exec("ALTER TABLE class ADD FOREIGN KEY (schedule_day_id) REFERENCES schedule_day(id)")
	//
	//
	//conn.Exec("ALTER TABLE schedule ADD FOREIGN KEY (group_id) REFERENCES group(id)")
	//
	//
	//conn.Exec("ALTER TABLE schedule_day ADD FOREIGN KEY (day_id) REFERENCES day(id)")
	//conn.Exec("ALTER TABLE schedule_day ADD FOREIGN KEY (schedule_id) REFERENCES schedule(id)")



	//conn.Exec("ALTER TABLE schedule ADD FOREIGN KEY (group_id) REFERENCES group(id)")




	CreateTestData(conn)
}
