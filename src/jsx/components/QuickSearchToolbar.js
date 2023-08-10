import { GridToolbarQuickFilter} from '@mui/x-data-grid';
import { Box } from "@material-ui/core";

const QuickSearchToolbar = () => {
    return (
      <Box
        style={{marginLeft : 'auto'}}
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />
      </Box>
    );
  }

  export default QuickSearchToolbar;