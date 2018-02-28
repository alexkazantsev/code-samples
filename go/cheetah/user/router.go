package user

import (
	"cheetah/app_utils"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/michaeljs1990/val"
	"net/http"
	"fmt"
)


func Router(r *gin.RouterGroup) {

	r.GET("/:id", func(ctx *gin.Context) {
		conn := ctx.MustGet("conn").(*gorm.DB)

		user_id := ctx.Param("id")

		result, err := Fetch(conn, user_id)

		if err != nil {
			ctx.JSON(http.StatusNotFound, result.Error)
			ctx.Abort()
		}

		ctx.JSON(http.StatusOK, result.Value)
	})

	r.POST("", func(ctx *gin.Context) {
		var userInput UserRequestJSON
		conn := ctx.MustGet("conn").(*gorm.DB)

		if _err := val.Bind(ctx.Request.Body, &userInput); _err == nil {
			result, err := Register(conn, &userInput)
			if err != nil {
				ctx.JSON(http.StatusBadRequest, app_utils.APPError{Message: err.Error()})
			} else {
				ctx.JSON(http.StatusOK, result)
			}
		} else {
			fmt.Println("_err")
			fmt.Println(_err)
			ctx.JSON(http.StatusBadRequest, app_utils.APPError{
				Message: "Some of your data is not correct!",
			})
		}

	})

}
