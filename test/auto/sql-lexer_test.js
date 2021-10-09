function returnCaseList() {
    return [
        {
            "input": "",
            "output": 0,
        },
        {
            "input": "select",
            "output": 1,
        },
        {
            "input": "select*",
            "output": 2,
        },
        {
            "input": "create table;",
            "output": 3,
        },
        {
            "input": ";;select*;select",
            "output": 6,
        },
        {
            "input": "select*from table where name ='hello';",
            "output": 9,
        },
        {
            "input": "select id,name,student.age from student where name = \"张三\" and score=23.22; ",
            "output": 19,
        },
        {
            "input": "select*from test where(id)>=2 and id<=10 ( or name = 'hello');",
            "output": 21,
        },
        {
            "input": "select* from t where (id)>2 or id != 3 and age between 10 and 20 order by id,name asc limit 2,10;",
            "output": 31,
        },
        {
            "input": "select id,name,student.age from student where (id<22) and (id>2) group by name having id > 20 order by id desc limit 0,10;",
            "output": 38,
        },
        {
            "input": "select * from table where id >= 2 and id != 2 or id == 2;",
            "output": 17,
        },
    ];
}