import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Share
} from 'react-native';

export default function ResultScreen({
  route,
  navigation
}) {

  const vehicle =
    route.params?.vehicle;

  const specs =
    route.params?.specs;

  const technicalRows =
    route.params?.technicalRows || [];

  const coverage =
    route.params?.coverage || 0;

  const shareText = useMemo(() => {

    return technicalRows
      .map(
        (row) =>
          ${row.label}: ${row.value}
      )
      .join('\n');

  }, [technicalRows]);

  async function handleShare() {

    try {

      await Share.share({
        message: shareText
      });

    } catch (error) {}
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.title}>
        Ficha Técnica
      </Text>

      <Text style={styles.subtitle}>
        Resultado padronizado gerado pela API Ford Competitive Intelligence.
      </Text>

      <View style={styles.highlightCard}>

        <Text style={styles.vehicleTitle}>
          {vehicle?.marca} {vehicle?.modelo}
        </Text>

        <Text style={styles.vehicleSubtitle}>
          {vehicle?.versao} • {vehicle?.ano}
        </Text>

        <View style={styles.coverageBadge}>
          <Text style={styles.coverageText}>
            Cobertura da ficha: {coverage}%
          </Text>
        </View>

      </View>

      <View style={styles.specificationsCard}>

        {technicalRows.map((item) => (

          <View
            key={item.label}
            style={styles.row}
          >

            <Text style={styles.label}>
              {item.label}
            </Text>

            <Text style={styles.value}>
              {item.value || 'Não disponível'}
            </Text>

          </View>

        ))}

      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleShare}
      >

        <Text style={styles.primaryButtonText}>
          Compartilhar ficha
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.goBack()}
      >

        <Text style={styles.secondaryButtonText}>
          Nova pesquisa
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#EEF3F8'
  },

  content: {
    padding: 18,
    paddingBottom: 40
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#071E3D'
  },

  subtitle: {
    marginTop: 8,
    color: '#5F6B7A',
    lineHeight: 21,
    marginBottom: 18
  },

  highlightCard: {
    backgroundColor: '#071E3D',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18
  },

  vehicleTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900'
  },

  vehicleSubtitle: {
    color: '#D7E7FF',
    marginTop: 6,
    marginBottom: 14
  },

  coverageBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2D9CDB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999
  },

  coverageText: {
    color: '#FFFFFF',
    fontWeight: '900'
  },

  specificationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#DDE6F2'
  },

  row: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF0'
  },

  label: {
    color: '#5F6B7A',
    fontWeight: '800',
    marginBottom: 5
  },

  value: {
    color: '#172033',
    fontWeight: '900',
    lineHeight: 21
  },

  primaryButton: {
    backgroundColor: '#071E3D',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 18
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900'
  },

  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE6F2',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 10
  },

  secondaryButtonText: {
    color: '#071E3D',
    fontWeight: '900'
  }
});