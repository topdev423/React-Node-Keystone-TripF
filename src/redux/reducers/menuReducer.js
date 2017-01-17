const initialState = {
  items: [
    {
      label: 'Home',
      url: '/',
      icon: 'home'
    },
    {
      label: 'Assignments',
      url: '/lessons',
      icon: 'library_books'
    },
    {
      label: 'Course Materials',
      url: '/materials',
      icon: 'picture_as_pdf'
    },
    {
      label: 'Tutorials',
      url: '/tutorials',
      icon: 'assignment_ind'
    },
    {
      label: 'Videos',
      url: '/videos',
      icon: 'video_library'
    },
    {
      label: 'Grades',
      url: '/grades',
      icon: 'stars'
    },
    {
      label: 'Quizzes',
      url: '/quizes',
      icon: 'help'
    }
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
