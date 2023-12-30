import { Grid, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormDatePicker from 'shared-component/form-fields/FormDatePicker';
import FormNumericTextField from 'shared-component/form-fields/FormNumericTextField';
import FormTextField from 'shared-component/form-fields/FormTextField';

interface CreateJournalForm {
  coin: string;
  amount: string;
  amountInDollar: string;
  lossLimit: string;
  lossLimitInPrecent: string;
  profitLimit: string;
  profitLimitInPrecent: string;
  strategy: string;
  analysis: string;
  gain: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export default function CreateJournal() {
  const { control } = useForm<CreateJournalForm>();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormTextField label="Coin" name="coin" control={control} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormNumericTextField label="Coin Amount" name="amount" control={control} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormNumericTextField
          label="Amount in Dollar"
          name="amountInDollar"
          control={control}
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormNumericTextField label="Loss Limit" name="lossLimit" control={control} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormNumericTextField
          label="Loss Limit in Percentage"
          name="lossLimitInPrecent"
          control={control}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormNumericTextField label="Profit Limit" name="profitLimit" control={control} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormNumericTextField
          label="Profit Limit in Percentage"
          name="profitLimitInPrecent"
          control={control}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormTextField label="Strategy" name="strategy" control={control} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormTextField label="Analysis" name="analysis" control={control} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormNumericTextField label="Gain" name="gain" control={control} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormTextField label="Description" name="description" control={control} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormDatePicker label="Start Date" name="startDate" control={control} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormDatePicker label="End Date" name="endDate" control={control} />
      </Grid>
    </Grid>
  );
}
