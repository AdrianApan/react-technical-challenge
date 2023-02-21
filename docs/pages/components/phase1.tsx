import * as React from 'react';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// You can use this dataset for the component
import { countries, countryDetails } from './countries';
import ComboBox from './ComboBox';

/**
 * You can render this page with:
 * yarn docs:dev && open http://0.0.0.0:3002/components/phase1/
 */

export default function LandingPage() {
  const exampleUsage = `<ComboBox options={countries} />`;

  const optionsStructure = `interface ComboBoxProps {
    options: string[];
  }`;

  const formattedOptionsList = countries.map(
    ({ code, label, phone }) =>
      // Ignored as it's out of scope for this exercise
      // @ts-ignore
      `${countryDetails[code].emoji} ${label} (+${phone})`,
  );

  return (
    <BrandingRoot>
      <Container>
        <Typography component="h1" variant="h2" sx={{ mt: 8 }}>
          ComboBox
        </Typography>

        <Typography component="p" sx={{ mt: 2 }}>
          The ComboBox is a normal text input enhanced by a list of suggested options.
        </Typography>
        <Box sx={{ mt: 2, border: `1px solid #ededed`, p: 4, borderRadius: 2 }}>
          <ComboBox options={formattedOptionsList} />
        </Box>
        <Box
          sx={{
            mt: 2,
            border: `1px solid #ededed`,
            pr: 2,
            pl: 2,
            borderRadius: 2,
          }}
        >
          <Typography component="div" sx={{ mt: 2 }}>
            <pre>{exampleUsage}</pre>
          </Typography>
        </Box>

        <Typography component="h4" variant="h4" sx={{ mt: 4 }}>
          Options structure
        </Typography>
        <Typography component="p" sx={{ mt: 2 }}>
          By default, the component accepts the following options structure:
        </Typography>
        <Box
          sx={{
            mt: 2,
            border: `1px solid #ededed`,
            pr: 2,
            pl: 2,
            borderRadius: 2,
          }}
        >
          <Typography component="div" sx={{ mt: 2 }}>
            <pre>{optionsStructure}</pre>
          </Typography>
        </Box>

        <Typography component="h4" variant="h4" sx={{ mt: 4, mb: 2 }}>
          Dropped behaviours
        </Typography>
        <ul>
          <li>Ability to remove an option from the suggestions list</li>
          <li>
            Exposing <em>onChange</em> handler as a prop
          </li>
          <li>
            Exposing <em>renderInput</em> as a prop
          </li>
          <li>
            <em>options</em> prop type (only accepts an array of strings)
          </li>
        </ul>
      </Container>
    </BrandingRoot>
  );
}
