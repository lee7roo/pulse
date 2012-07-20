package com.ali.moc.common.util;

import com.alibaba.buc.api.exception.BucException;
import com.alibaba.buc.api.model.User;
import com.alibaba.buc.client.service.provider.BucServiceProvider;

public class Buc {

	public User queryUser(String email) {
		User user = null;
		try {
			user = BucServiceProvider.getUserQueryService().getUser(email, false, false);
		} catch (BucException e) {
			e.printStackTrace();
		}
		return user;
	}
	
}