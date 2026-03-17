export const SearchBar = ({ level, topic, onChangeLevel, onChangeTopic , onReset}) => {
  return (
    <div>
      <input
        type="text"
        value={topic}
        onChange={e => {
          onChangeTopic(e.target.value);
        }}
        placeholder="Topic filter"
      />
      <select
        value={level}
        onChange={e => {
          onChangeLevel(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="beginner">Beginnner</option>
        <option value="intermediate">Intermadiate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button onClick={onReset}>Reset filters</button>
    </div>
  );
};
