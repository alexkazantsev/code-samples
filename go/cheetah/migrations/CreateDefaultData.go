package migrations

import (
	"cheetah/account"
	"cheetah/app_utils"
	"cheetah/department"
	"cheetah/faculty"
	"cheetah/group"
	"cheetah/university"
	"cheetah/user"
	"cheetah/lesson"
	"cheetah/class"
	"cheetah/teacher"
	"cheetah/schedule"
	"cheetah/schedule_day"
	"cheetah/day"
	"github.com/jinzhu/gorm"
)

func CreateTestData(conn *gorm.DB) {
	_universities := university.Universities{
		university.University{
			Name:     "Foo",
			Location: "Kiev",
			Faculties: faculty.Faculties{
				faculty.Faculty{
					Name: "faculty_1",
					Departments: department.Departments{
						department.Department{Name: "department_1",
							Groups: group.Groups{
								group.Group{
									Name: "HR-1",
								},
							},
						},
					},
				},
				faculty.Faculty{Name: "faculty_2"},
				faculty.Faculty{Name: "faculty_3"},
				faculty.Faculty{Name: "faculty_4"},
				faculty.Faculty{Name: "faculty_5"},
				faculty.Faculty{Name: "faculty_6"},
			},
		},
	}

	for _, u := range _universities {
		university.Create(conn, &u)
	}

	users := user.Users{
		user.User{
			FirstName: "Foo",
			LastName:  "Bar",
			Group: group.Group{
				Name:         "HR-2",
			},
			VkID:1,
			UniversityID: 1,
			FacultyID:    1,
			DepartmentID: 1,
			Account: account.Account{
				Password: app_utils.CryptPass("qwerty123"),
				Email:    "foo@bar.com",
			},
		},
	}

	for _, u := range users {
		user.Create(conn, &u)
	}


	lessons := lesson.Lessons{
		lesson.Lesson{
			Name:"English",
		},
		lesson.Lesson{
			Name:"Math",
		},
		lesson.Lesson{
			Name:"German",
		},
		lesson.Lesson{
			Name:"Physics",
		},
	}

	for _, u := range lessons {
		lesson.Create(conn, &u)
	}


	teachers := teacher.Teachers{
		teacher.Teacher{
			Firstname:"Ivan",
			Lastname:"Ivanov",
		},
		teacher.Teacher{
			Firstname:"Petr",
			Lastname:"Petrov",
		},
	}

	for _, u := range teachers {
		teacher.Create(conn, &u)
	}




	classes := class.Classes{
		class.Class{
			LessonID:1,
			Building:"Main Building",
			RoomNum:1,
			Even:false,
			TeacherID:1,
			Position:1,
			ScheduleDayID:1,
		},
		class.Class{
			LessonID:2,
			Building:"Main Building",
			RoomNum:2,
			Even:false,
			TeacherID:2,
			Position:2,
			ScheduleDayID:1,
		},
		class.Class{
			LessonID:3,
			Building:"Main Building",
			RoomNum:1,
			Even:false,
			TeacherID:1,
			Position:1,
			ScheduleDayID:2,
		},
		class.Class{
			LessonID:4,
			Building:"Main Building",
			RoomNum:2,
			Even:false,
			TeacherID:2,
			Position:2,
			ScheduleDayID:2,
		},
	}


	for _, u := range classes {
		class.Create(conn, &u)
	}

	groups := group.Groups{
		group.Group{
			Name:"RT-810",
		},
		group.Group{
			Name:"RT-710",
		},
	}

	for _, u := range groups {
		group.Create(conn, &u)
	}


	days := day.Days{
		day.Day{
			Name:"Monday",
		},
		day.Day{
			Name:"Tuesday",
		},
		day.Day{
			Name:"Wednesday",
		},
		day.Day{
			Name:"Thursday",
		},
		day.Day{
			Name:"Friday",
		},
		day.Day{
			Name:"Saturday",
		},
		day.Day{
			Name:"Sunday",
		},

	}

	for _, u := range days {
		day.Create(conn, &u)
	}



	scheduledays := schedule_day.ScheduleDays{
		schedule_day.ScheduleDay{
			ScheduleID:1,
			DayID:1,
		},
		schedule_day.ScheduleDay{
			ScheduleID:2,
			DayID:2,
		},
	}

	for _, u := range scheduledays {
		schedule_day.Create(conn, &u)
	}



	 schedules := schedule.Schedules{
	 	schedule.Schedule{
	 		GroupID: 1,
	 	},
		 schedule.Schedule{
			 GroupID: 2,
		 },
	 }

	 for _, u := range schedules {
	 	schedule.Create(conn, &u)
	 }


}
