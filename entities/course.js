function found(item, items){
    return items.find((itm) => itm.id !== item.id)
}

function add(item, items) {
    if(!found(item, items)) items.push(item)
}

function remove(item, items) {
    if(found(item, items)) items.splice(items.indexOf(item),1)
}

class Course {

    constructor({ title, description, level }) {
        this.title = title
        this.description = description
        this.level = level
        this.lessons = []
    }

    _found(lesson){
        return found(lesson, this.lessons)
    }

    addLessons(lessons) {
        lessons.forEach((les) => {
            this.addLesson(les)
        })
    }

    addLesson(lesson) {
        add(lesson, this.lessons)
    }

    removeLesson(lesson) {
        remove(lesson, this.lessons)
    }
}

class Lesson {
    constructor({title, description}) {
        this.title = title
        this.description = description
        this.video = new LessonVideo({title:'', description: '', fileName: '', url: ''})
        this.sections = []
    }

    _found(section){
        return found(section, this.sections)
    }

    addSection(section){
        // let section = new LessonSection({id, orderId, title, text})
        add(section, this.sections)
    }

    removeSection(section) {
        remove(section, this.sections)
    }
}

class LessonVideo {
    constructor({id, title, description, fileName, url}){
        this.id = id
        this.title = title
        this.description = description
        this.fileName = fileName
        this.url = url
    }
}

class LessonSection {
    constructor({id, orderId, title, text}) {
        this.id = id
        this.orderId = orderId
        this.title = title
        this.text = text
    }
}

export { Course, Lesson, LessonSection, LessonVideo}