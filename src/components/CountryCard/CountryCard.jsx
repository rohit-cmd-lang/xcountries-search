import styles from "./CountryCard.module.css";
const CountryCard = ({ name, flag }) => {
  return (
    <div className={styles.countryCard}>
      <img src={flag} alt={"Flag of " + name} className={styles.flag} />
      <p>{name}</p>
    </div>
  );
};

export default CountryCard;
