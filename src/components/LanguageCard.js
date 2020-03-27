import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";
import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";

import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "50px",
    boxShadow: "2px solid grey",
    borderRadius: "10px"
  },
  content: {
    padding: 20
  },
  cta: {
    marginTop: 24,
    textTransform: "initial"
  }
}));

const LanguageCard = ({ repo, index }) => {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%"
  });
  const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
  const { login, avatar_url } = owner;
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia classes={mediaStyles} image={avatar_url} />
      <CardContent className={styles.content}>
        <TextInfoContent
          classes={textCardContentStyles}
          overline={login}
          heading={name}
        />
        <Box display={"flex"}>
          <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Stars</p>
            <p className={styles.statValue}>{stargazers_count}</p>
          </Box>
          <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Forks</p>
            <p className={styles.statValue}>{forks}</p>
          </Box>
          <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Issues</p>
            <p className={styles.statValue}>{open_issues}</p>
          </Box>
        </Box>
        <Link href={html_url} variant="body2" target="_blank" rel="noreferrer">
          #{index+1}
        </Link>
      </CardContent>
    </Card>
  );
};

export default LanguageCard;
