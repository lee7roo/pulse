package com.ali.moc.common.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CommonUtil {

	public static Pattern[] compilePatterns(String[] inputs) {
		if (inputs == null)
			return null;
		Pattern[] patterns = new Pattern[inputs.length];
		for (int i = 0; i < inputs.length; i++) {
			inputs[i] = escapeStringLiteralForWildCard(inputs[i].trim());
			inputs[i] = inputs[i].replace("*", "(.*)").replace("?", "(.{1})");
			Pattern p = Pattern.compile(inputs[i], Pattern.CASE_INSENSITIVE);
			patterns[i] = p;
		}
		return patterns;
	}
	
   public static boolean isExclusionMatched(Pattern[] exclusionPatterns, String uri) {
        if (exclusionPatterns != null) {
            uri = uri.trim();
            for (Pattern exclusionPattern : exclusionPatterns) {
                // 匹配的URI则不需要登录即可访问
                if (isWildCardMatched(uri, exclusionPattern)) {
                    return true;
                }
            }
        }
        return false;
    }

	private static String escapeStringLiteralForWildCard(String original) {
		if (original == null) {
			return null;
		}
		StringBuilder result = new StringBuilder();

		for (int i = 0; i < original.length(); i++) {
			char curChar = original.charAt(i);
			boolean stillAppend = true;
			switch (curChar) {
			case '$':
			case '(':
			case ')':
			case '+':
			case '.':
			case '[':
			case '\\':
			case '^':
			case '{':
			case '|':
				result.append('\\');
				break;
			case '\r':
				result.append('\\').append('r');
				stillAppend = false;
				break;
			case '\n':
				result.append('\\').append('n');
				stillAppend = false;
				break;
			case '\t':
				result.append('\\').append('t');
				stillAppend = false;
				break;
			case '\f':
				result.append('\\').append('f');
				stillAppend = false;
				break;
			case '\000':
				result.append('\\').append('0');
				stillAppend = false;
			}

			if (stillAppend) {
				result.append(curChar);
			}
		}
		return result.toString();
	}
	
    /**
     * 对指定的文本进行模糊匹配，支持* 和?，不区分大小写
     * 
     * @param text 要进行模糊匹配的文本
     * @param pattern 模糊匹配表达式
     * @return
     */
    private static boolean isWildCardMatched(String text, Pattern pattern) {
        Matcher m = pattern.matcher(text);
        return m.matches();
    }

}
