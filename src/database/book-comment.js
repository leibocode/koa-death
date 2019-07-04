const sequelize = require('../middwares/database')
const {
    Sequelize,
    Model
} = require('sequelize')

class Comment extends Model {
    static async addComment(bookId,content){
        const comment = await Comment.findOne({
            where:{
                book_id:bookId,
                content
            }
        })
        if(!comment){
            return await Comment.create({
                book_id:bookId,
                content,
                nums:1
            })
        }else {
            return await comment.increment('nums',{
                by:1
            })
        }
    }

    static async getComments(bookID){
        const comments  = await Comment.findAll({
            where:{
                book_id:bookId
            }
        })
        return comments
    }
}
Comment.prototype.exclude = ['book_id','id']


Comment.init({
    content:Sequelize.STRING(12),
    nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    book_id:Sequelize.INTEGER,
    // exclude:['book_id','id']
},{
    sequelize,
    tableName:'comment'
})

module.exports = {
    Comment
}