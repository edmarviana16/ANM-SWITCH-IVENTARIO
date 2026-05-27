// ============================================================
// INVENTÁRIO COMPLETO DE ATIVOS DE REDE — DADOS ESTRUTURADOS
// ============================================================

export const SEDE_CORE = [
  {
    localidade: "Switch ANM-CORE",
    ip: "10.50.40.2",
    equipamentos: [
      { modelo: "HUAWEI CE6865-48S8CQ-EI", serial: "2102351RFDDML3930387", portas: null }
    ],
    status: "ok"
  },
  {
    localidade: "Switch ANM-TOR",
    ip: "10.50.40.3",
    equipamentos: [
      { modelo: "HUAWEI S5731-H48P4XC", serial: "DM2032002296", portas: null },
      { modelo: "HUAWEI S5731-H48P4XC", serial: "DM2032002304", portas: null }
    ],
    status: "ok"
  },
  {
    localidade: "Switch ANM-CORE-IBRAN-SEDE",
    ip: "10.50.40.4",
    equipamentos: [
      { modelo: "HUAWEI CE6865-48S8CQ-EI", serial: "2102351RFDDML3930386", portas: null }
    ],
    status: "ok"
  }
];

// ... (ver arquivo completo no repositório)
// Dados completos: SEDE_ANDARES (9 localidades) e REGIONAIS (25 regionais + escritórios)
