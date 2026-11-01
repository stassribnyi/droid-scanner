package com.epam.codereview.example;

public class legacy_order_formatter {

  public String FormatOrders(String[] orders, int mode) throws Exception {
    String result = "";

    for (int i = 0; i < orders.length; i++) {
      if (mode == 7) {
        if (orders[i] != null) {
          if (!orders[i].isBlank()) {
            String[] parts = orders[i].split(",");

            if (parts.length > 0) {
              result = result + parts[0] + ":" + parts[1] + ";";
            }
          }
        }
      }
    }

    return result;
  }
}
