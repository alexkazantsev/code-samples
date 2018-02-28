package login

import (
	"cheetah/app_utils"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"net/http"
	"fmt"
)

func Router(r *gin.RouterGroup) {

	r.POST("", func(ctx *gin.Context) {
		conn := ctx.MustGet("conn").(*gorm.DB)
		loginJson := LoginJSON{}

		if ctx.BindJSON(&loginJson) == nil {
			result, err := LoginUser(conn, &loginJson)
			if err != nil {
				ctx.JSON(http.StatusUnauthorized, app_utils.APPError{Message: err.Error()})
			} else {
				ctx.JSON(http.StatusOK, result)
			}
		} else {
			ctx.JSON(http.StatusBadRequest, app_utils.APPError{
				Message: "Some of your data is not correct!",
			})
		}
	})


	r.POST("/vk", func(ctx *gin.Context) {
		conn := ctx.MustGet("conn").(*gorm.DB)
		loginJson := LoginJSON{}



		loginJson.VkID = ctx.Query("vk_id")
		//foo := ctx.Query("vkId")

		//fmt.Println(ctx.Query("vk_id"))
		//fmt.Println(ctx.PostForm("vk_id"))
		//fmt.Println(ctx.GetPostForm("vk_id"))
		//fmt.Println(ctx.GetQuery("vk_id"))

		//foo



		if ctx.BindJSON(&loginJson) == nil {

			fmt.Println("Entered HERE")
			fmt.Println(loginJson)
			result, err := LoginUserVK(conn, &loginJson)
			if err != nil {
				ctx.JSON(http.StatusUnauthorized, app_utils.APPError{Message: err.Error()})
			} else {
				ctx.JSON(http.StatusOK, result)
			}
		} else {
			ctx.JSON(http.StatusBadRequest, app_utils.APPError{
				Message: "Some of your data is not correct!",
			})
		}
	})
}
