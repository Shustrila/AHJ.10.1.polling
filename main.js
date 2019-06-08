import http from 'http';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import koaCors from 'koa-cors';
import faker from 'faker';

const app = new Koa();
const router =new KoaRouter();
const port = process.env.PORT || 7070;

app.use(koaCors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}));
app.use(koaBody({ urlencoded: true }));


router.get('/messages/unread' , async (ctx, next) => {
    let data = {};
    data.status = "ok";
    data.timestamp = new Date();
    data.messages = [];

    for (let i = 0; i < 100; i++) {
        let push = {};
        push.id = faker.random.uuid();
        push.from = faker.internet.email();
        push.subject = faker.lorem.words();
        push.body = faker.lorem.words();
        push.received = faker.date.recent();

        data.messages.push(push);
    }

    ctx.response.body = data;

    await next();
});

app.use(router.routes());

http.createServer(app.callback()).listen(port);
