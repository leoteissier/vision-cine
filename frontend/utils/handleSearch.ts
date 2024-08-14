const handleSearch = (searchValue: string, searchParam: Ref<string>, fetchData: () => Promise<void>) => {
    searchParam.value = searchValue;
    fetchData();
};

export default handleSearch;
