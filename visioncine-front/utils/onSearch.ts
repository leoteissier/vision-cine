const { title, fetchMovies } = useMovie();
const { firstname, lastname, fetchActors } = useActor();
const { name, fetchCategories } = useCategory();
export const onSearchMovie = (searchValue: string) => {
    handleSearch(searchValue, title, fetchMovies);
};

export const onSearchActor = (searchFirstname: string, searchLastname: string) => {
    firstname.value = searchFirstname;
    lastname.value = searchLastname;
    fetchActors()
};

export const onSearchCategory = (searchName: string) => {
    name.value = searchName;
    fetchCategories()
};