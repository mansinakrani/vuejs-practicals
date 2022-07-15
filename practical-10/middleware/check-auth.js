export default function(context) {
    context.store.dispatch("autoLogin", context.req);
}