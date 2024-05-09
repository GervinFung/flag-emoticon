const useSearch = () => {
	const route = useRoute();

	const { search } = route.query;

	return ref(typeof search !== 'string' ? '' : search);
};

export default useSearch;
