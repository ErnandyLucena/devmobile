import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  // Card do paciente
  patientCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
        shadowColor: "#000",
      },
    }),
  },

  patientHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0004ffff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  patientInfo: {
    flex: 1,
  },

  patientName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },

  patientId: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  infoItem: {
    width: "48%",
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },

  // Seção de histórico
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },

  badge: {
    backgroundColor: "#104200ff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 32,
    alignItems: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  // Loading e estado vazio
  loadingContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },

  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },

  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
    paddingHorizontal: 40,
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.3,
  },

  emptySubtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "400",
  },

  // Cards de consulta
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
        shadowColor: "#000",
      },
    }),
  },

  historyCardExpanded: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  dateBadge: {
    backgroundColor: "#193efaff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  dateText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.3,
  },

  cardHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  consultType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  fieldGroup: {
    marginBottom: 16,
  },

  fieldLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  fieldValue: {
    fontSize: 15,
    fontWeight: "400",
    color: "#111827",
    lineHeight: 22,
  },

  // Informações do médico
  doctorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  doctorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  doctorAvatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  doctorLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  doctorName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  // Espaçamento final
  footerSpacer: {
    height: 20,
  },
  // Adicione estas propriedades ao seu arquivo styles.js

contactButtons: {
  flexDirection: 'row',
  marginTop: 8,
  gap: 8,
},

contactButton: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#F3F4F6',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E5E7EB',
},

infoSubtext: {
  fontSize: 11,
  color: '#9CA3AF',
  marginTop: 2,
  fontWeight: '400',
},

additionalInfo: {
  marginTop: 8,
},

additionalInfoItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
  gap: 8,
},

additionalInfoText: {
  fontSize: 13,
  color: '#6B7280',
  fontWeight: '400',
},
});