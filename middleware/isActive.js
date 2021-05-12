export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.auth.authUser != null && !store.state.auth.authUser.isActive) {
        return redirect('/video_courses/cantviewlesson')
    }
}