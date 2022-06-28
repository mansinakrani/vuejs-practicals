export default function(context) {
    if (!context.store.getters.isUserAuthenticated) {
        context.redirect('/')
    }
}